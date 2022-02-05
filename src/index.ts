
import { TextParser }  from './html.parser';

const btn: HTMLElement = document.querySelector('#btn') as HTMLButtonElement;

export default class Highlight {

  highlightContent = (content: string) => {

    return () => {
      let selObj = window.getSelection();
      let selRange = selObj!.getRangeAt(0);
      
      localStorage.setItem('RANGE: ', JSON.stringify(selRange));
      
      let div = document.createElement('div');
      div.appendChild(selRange.cloneContents());
      
      // Selected TEXT as HTML
      const selectedText = div.innerHTML;
      const htmlContent : HTMLElement = document.getElementById(content) as HTMLElement;
      const htmlText: string = htmlContent.innerHTML
      const searchTextParser = new TextParser(htmlText, selectedText, { prefix: 'volley-id-'});
      const result = searchTextParser.parser();
      const { highlightedHtmlResult: newHtmlText } = result;
      const contentNode : HTMLElement = document.getElementById(content) as HTMLElement;
        // Update with new html
      contentNode.innerHTML = newHtmlText;
      
    };
}
}

const highlightHtml = new Highlight;

let highlight = highlightHtml.highlightContent("content");

btn.addEventListener("click", highlight, false);

// window.addEventListener("DOMContentLoaded", (e)=>{
  
// })

  // = highlight("content")
