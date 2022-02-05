import { TagType } from './text.util.interface';
/**
 * contains methods that helps in formatting the highlighted html text
 * @class TextUtil
 */
export declare class TextUtil {
    /**
     * removes all newline in html text
     * @param {string} htmlText - highlighted html text
     * @return {string} the highligthed html text a single line
     * @memberof TextUtil
     */
    stringifyHtml(htmlText: string): string;
    /**
     *
     * return the sign types
     * @return {object}  - an object containing a greater than '>'sign or a less than sign '<'
     * @memberof TextUtil
     */
    checkTagInText(): TagType;
    /**
     *
     * checks the first character in the targeted  html text
     * @param {string} targetedHtmlText
     * @return {boolean} true or false depending on first character in the html
     * text to be higlighted starts with an opening sign '<'
     * @memberof TextUtil
     */
    beginsWithOpenTag(targetedHtmlText: string): boolean;
    /**
    *
    * checks the first character in the targeted  html text
    * @param {string} targetedHtmlText
    * @return {boolean} true or false depending on last character in the html
    * text to be higlighted starts with an closing sign '<'
    * @memberof TextUtil
    */
    endsWithClosingTag(targetedHtmlText: string): boolean;
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
    private abstractTextFromTag;
    /**
     *
     *
     * @param {string} targetedText - highlighed html text
     * @return {string}  target html text without the first open sign in the first and last tag
     * @memberof TextUtil
     */
    removeFirstOpeningTag(targetedText: string): string;
    /**
     * look up for the index of the opening sign '<' in the first open  and last open tag of the highlited html text
     *
     * @private
     * @param {string} targetedText - highlighed html text
     * @return {object}  - index of the opening sign '<' in the first open tag , last open tag and the target html text
     * @memberof TextUtil
     */
    private identifyNextOpenTagIndex;
    /**
     *
     *
     * @param {string} targetedText - highlighed html text
     * @return {string}  target html text without the first close sign  '>' in the first and last tag
     * @memberof TextUtil
     */
    removeLastClosingTag(targetedText: string, startIndex?: number | null): string;
    /**
     * look up for the index of the  closing sign '>' in the first open  and last open tag of the highlited html text
     *
     * @private
     * @param {string} targetedText - highlighed html text
     * @return {object}  - index of the opening sign '>' in the first open tag , last open tag and the target html text
     * @memberof TextUtil
     */
    private identifyNextClosingTagIndex;
}
