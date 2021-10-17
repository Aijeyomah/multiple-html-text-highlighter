import { TextParser }  from './html.parser'
const htmlText = `<div class = 'content' id="content">
      <h1>
          This is <b><>Magic!<></b> <br> hello</br> <a href="google.com">Lorem ipsum</a>
      </h1>
    </div>`;

const searchText = `<>Magic!<>`;

const searchTextParser = new TextParser(htmlText, searchText, { prefix: 'omah-id-'});
console.log(searchTextParser.parser().highlightedHtmlResult)