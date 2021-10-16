import { TagType, TagIndexes } from './text.util.interface'

export class TextUtil {
   
    stringifyHtml(htmlText: string){
        return htmlText.split('\n').join('')
    }

    checkTagInText(): TagType{
        return {
            openingTag: '<',
            closingTag: '>'
        }
    }

        beginsWithOpenTag(targetedHtmlText:string): boolean {
           return targetedHtmlText[0] === this.checkTagInText().openingTag
        }

        endsWithClosingTag(targetedHtmlText:string): boolean {
         
            return targetedHtmlText[targetedHtmlText.length - 1] === this.checkTagInText().closingTag
      
        }

        //<p1> hello <br> there <p1>
        private abstractTextFromTag(targetedHtmlText: string,tagStartIndex: number, tagEndIndex: number) : string {
            const stringBeforeOpeningTag = targetedHtmlText.substr(0, tagStartIndex);
            const stringAfterClosingTag = targetedHtmlText.substr(tagEndIndex + 1);
            const searchText = `${stringBeforeOpeningTag}${stringAfterClosingTag}`;
            console.log(searchText);
            
            return searchText;
        }

       removeFirstOpeningTag(targetedText:string): string{

            const { targetedText: newtargetedText } = this.identifyNextOpenTagIndex(targetedText);

            if(targetedText[0] === this.checkTagInText().openingTag){
                return this.removeFirstOpeningTag(newtargetedText)
            }else{
                return newtargetedText;
            }
        }

        private identifyNextOpenTagIndex(targetedText: string): TagIndexes {
            let tagStartIndex: number = 0;
            let tagEndIndex: number = 0;
            let seenStartTag = false;

            for(let i=0; i< targetedText.length; ++i ){
                if(!seenStartTag && targetedText[i] === this.checkTagInText().openingTag){
                    tagStartIndex = i;
                    seenStartTag = true;
                }

                if(targetedText[i] ===  this.checkTagInText().closingTag){
                    tagEndIndex = i;
                    break;
                }
            }

            targetedText = this.abstractTextFromTag(targetedText,tagStartIndex,tagEndIndex);
            return {tagStartIndex, tagEndIndex, targetedText}

        }

        removeLastClosingTag(targetedText: string, startIndex: number|null = null):string{
        
            const { targetedText: newtargetedText , tagStartIndex } = this.identifyNextClosingTagIndex(targetedText, startIndex);
           
            if(targetedText[tagStartIndex - 1] === this.checkTagInText().closingTag){
                return this.removeLastClosingTag(newtargetedText, tagStartIndex - 1)
            }else{
                return newtargetedText;
            }
        }

        private identifyNextClosingTagIndex(targetedText: string, startIndex: null|number): TagIndexes {
            let tagStartIndex: number = 0;
            let tagEndIndex: number = 0;
            let seenEndTag = false;

            for(let i = startIndex ||targetedText.length - 1;i >=0; --i ){
                if(!seenEndTag && targetedText[i] === this.checkTagInText().closingTag){
                    tagEndIndex = i;
                    seenEndTag = true;
                }

                if(targetedText[i] ===  this.checkTagInText().openingTag){
                    tagStartIndex = i;
                    break;
                }
            }
            targetedText = this.abstractTextFromTag(targetedText, tagStartIndex,tagEndIndex);
            return {tagStartIndex, tagEndIndex, targetedText}
        }

        
    }

    

