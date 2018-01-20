
function HtmlElementsPlugin(locations) {
  this.locations = locations;
}

HtmlElementsPlugin.prototype.apply = function(compiler) {
  let self = this;
  compiler.plugin('compilation', function(compilation) {
    compilation.options.htmlElements = compilation.options.htmlElements || {};

    compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
      const locations = self.locations;

      if (locations) {
        const publicPath = htmlPluginData.assets.publicPath;

        Object.getOwnPropertyNames(locations).forEach(function(loc) {
          compilation.options.htmlElements[loc] = getHtmlElementString(locations[loc], publicPath);
        });
      }


      callback(null, htmlPluginData);
    });
  });

};

const RE_ENDS_WITH_BS = /\/$/;

/**
 * Cria uma tag HTML com atributos d eum map.
 *
 * Exemplo:
 * createTag('link', { rel: "manifest", href: "/assets/manifest.json" })
 * // <link rel="manifest" href="/assets/manifest.json">
 * @param tagName O nome da tag
 * @param attrMap O map com os atributos (keys) e seus valores.
 * @param publicPath um caminho para adicionar no inicio da url statica do asset
 * @returns {string}
 */
function createTag(tagName, attrMap, publicPath) {
  publicPath = publicPath || '';

  // adiciona a barra '/' se for um path publico e não existir uma
  if (publicPath && !RE_ENDS_WITH_BS.test(publicPath)) {
    publicPath += '/';
  }

  const attributes = Object.getOwnPropertyNames(attrMap)
    .filter(function(name) { return name[0] !== '='; } )
    .map(function(name) {
      let value = attrMap[name];

      if (publicPath) {
        const usePublicPath = attrMap.hasOwnProperty('=' + name) ? !!attrMap['=' + name] : name === 'href';

        if (usePublicPath) {
          // remove a barra '/' se o valor ja conter uma, para nao gerar duplicidade '//'
          value = publicPath + (value[0] === '/' ? value.substr(1) : value);
        }
      }

      return `${name}="${value}"`;
    });

  const closingTag = tagName === 'script' ? '</script>' : '';

  return `<${tagName} ${attributes.join(' ')}>${closingTag}`;
}

/**
 * Retorna uma string representando todos os elementos html definidos em um arquivo fonte
 *
 * Exemplo:
 *
 *    const ds = {
 *      link: [
 *        { rel: "apple-touch-icon", sizes: "57x57", href: "/assets/icon/apple-icon-57x57.png" }
 *      ],
 *      meta: [
 *        { name: "msapplication-TileColor", content: "#00bcd4" }
 *      ]
 *    }
 *
 * getHeadTags(ds);
 * // "<link rel="apple-touch-icon" sizes="57x57" href="/assets/icon/apple-icon-57x57.png">"
 *    "<meta name="msapplication-TileColor" content="#00bcd4">"
 *
 * @returns {string}
 */
function getHtmlElementString(dataSource, publicPath) {
  return Object.getOwnPropertyNames(dataSource)
    .map(function(name) {
      if (Array.isArray(dataSource[name])) {
        return dataSource[name].map(function(attrs) { return createTag(name, attrs, publicPath); } );
      } else {
        return [ createTag(name, dataSource[name], publicPath) ];
      }
    })
    .reduce(function(arr, curr) {
      return arr.concat(curr);
    }, [])
    .join('\n\t');
}
module.exports = HtmlElementsPlugin;
