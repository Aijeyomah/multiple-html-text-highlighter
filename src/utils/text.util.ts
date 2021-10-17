import { TagType, TagIndexes } from './text.util.interface'



/**
 * contains methods that helps in formatting the highlighted html text
 * @class TextUtil
 */
export class TextUtil {
    /**
     * removes all newline in html text
     * @param {string} htmlText - highlighted html text 
     * @return {string} the highligthed html text a single line 
     * @memberof TextUtil
     */
    stringifyHtml(htmlText: string) {
        return htmlText.split('\n').join('')
    }

    /**
     *
     * return the sign types
     * @return {object}  - an object containing a greater than '>'sign or a less than sign '<'
     * @memberof TextUtil
     */
    checkTagInText(): TagType {
        return {
            openingSign: '<',
            closingSign: '>'
        }
    }
    /**
     *
     * checks the first character in the targeted  html text
     * @param {string} targetedHtmlText
     * @return {boolean} true or false depending on first character in the html 
     * text to be higlighted starts with an opening sign '<'
     * @memberof TextUtil
     */
    beginsWithOpenTag(targetedHtmlText: string): boolean {
        return targetedHtmlText[0] === this.checkTagInText().openingSign
    }

    /**
    *
    * checks the first character in the targeted  html text
    * @param {string} targetedHtmlText
    * @return {boolean} true or false depending on last character in the html 
    * text to be higlighted starts with an closing sign '<'
    * @memberof TextUtil
    */
    endsWithClosingTag(targetedHtmlText: string): boolean {

        return targetedHtmlText[targetedHtmlText.length - 1] === this.checkTagInText().closingSign

    }

    //<p1> hello <br> there <p1>
    /**
     *
     *
     * @private
     * @param {string} targetedHtmlText - the html content to be highlighted
     * @param {number} tagStartIndex - the index of the opening sign(if the html targeted text starts with a tag or ends with a tag)
     * @param {number} tagEndIndex - the index of the closing sign
     * @return {string} target html text without the initial open and close tag(if present)
     * @memberof TextUtil
     */
    private abstractTextFromTag(targetedHtmlText: string, tagStartIndex: number, tagEndIndex: number): string {

        const stringBeforeOpeningTag = targetedHtmlText.substr(0, tagStartIndex);
        const stringAfterClosingTag = targetedHtmlText.substr(tagEndIndex + 1);
        const searchText = `${stringBeforeOpeningTag}${stringAfterClosingTag}`;

        return searchText;
    };

    /**
     *
     * 
     * @param {string} targetedText - highlighed html text
     * @return {string}  target html text without the first open sign in the first and last tag
     * @memberof TextUtil
     */
    removeFirstOpeningTag(targetedText: string): string {

        const { targetedText: newtargetedText } = this.identifyNextOpenTagIndex(targetedText);

        if (targetedText[0] === this.checkTagInText().openingSign) {
            return this.removeFirstOpeningTag(newtargetedText)
        } else {
            return newtargetedText;
        }
    }

    /**
     * look up for the index of the opening sign '<' in the first open  and last open tag of the highlited html text
     *
     * @private
     * @param {string} targetedText - highlighed html text
     * @return {object}  - index of the opening sign '<' in the first open tag , last open tag and the target html text
     * @memberof TextUtil
     */
    private identifyNextOpenTagIndex(targetedText: string): TagIndexes {
        let tagStartIndex: number = 0;
        let tagEndIndex: number = 0;
        let seenStartTag = false;

        for (let i = 0; i < targetedText.length; ++i) {
            if (!seenStartTag && targetedText[i] === this.checkTagInText().openingSign) {
                tagStartIndex = i;
                seenStartTag = true;
            }

            if (targetedText[i] === this.checkTagInText().closingSign) {
                tagEndIndex = i;
                break;
            }
        }

        targetedText = this.abstractTextFromTag(targetedText, tagStartIndex, tagEndIndex);
        return { tagStartIndex, tagEndIndex, targetedText }

    }


    /**
     *
     * 
     * @param {string} targetedText - highlighed html text
     * @return {string}  target html text without the first close sign  '>' in the first and last tag
     * @memberof TextUtil
     */
    removeLastClosingTag(targetedText: string, startIndex: number | null = null): string {

        const { targetedText: newtargetedText, tagStartIndex } = this.identifyNextClosingTagIndex(targetedText, startIndex);

        if (targetedText[tagStartIndex - 1] === this.checkTagInText().closingSign) {
            return this.removeLastClosingTag(newtargetedText, tagStartIndex - 1)
        } else {
            return newtargetedText;
        }
    }


    /**
     * look up for the index of the  closing sign '>' in the first open  and last open tag of the highlited html text
     *
     * @private
     * @param {string} targetedText - highlighed html text
     * @return {object}  - index of the opening sign '>' in the first open tag , last open tag and the target html text
     * @memberof TextUtil
     */
    private identifyNextClosingTagIndex(targetedText: string, startIndex: null | number): TagIndexes {
        let tagStartIndex: number = 0;
        let tagEndIndex: number = 0;
        let seenEndTag = false;

        for (let i = startIndex || targetedText.length - 1; i >= 0; --i) {
            if (!seenEndTag && targetedText[i] === this.checkTagInText().closingSign) {
                tagEndIndex = i;
                seenEndTag = true;
            }

            if (targetedText[i] === this.checkTagInText().openingSign) {
                tagStartIndex = i;
                break;
            }
        }
        targetedText = this.abstractTextFromTag(targetedText, tagStartIndex, tagEndIndex);
        return { tagStartIndex, tagEndIndex, targetedText }
    }


}



