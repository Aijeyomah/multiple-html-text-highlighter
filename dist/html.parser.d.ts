import { Revision, Options, Parser } from "./utils/text.util.interface";
/**
 *
 *
 * @export
 * @class TextParser
 */
export declare class TextParser {
    htmlText: string;
    targetText: string;
    options: Options | {
        prefix: string;
    };
    originalTargetedText: string;
    highlightedHtmlResult: string;
    processedTargetedText: string;
    changeRevisions: Revision[];
    leftHtmlText: string;
    rightHtmlText: string;
    insertedWords: string;
    constructor(htmlText: string, targetText: string, options: Options | {
        prefix: string;
    });
    private updateChangeRevision;
    /**
     *
     *
     * @return {string} The whole html text with the the highleted text
     * wrapped in a span with an id contaoining the prefix passed if the targerted text is present
     * @memberof TextParser
     */
    getHighlightedHtmlResult(): string;
    /**
     * get c
     *
     * @private
     * @param {number} index
     * @return {number} - index of the targeted text after  open or close span tag
     * @memberof TextParser
     */
    private getNewIndexAfterRevisions;
    private addNewSpan;
    private saveUpdate;
    private insertSpan;
    parser(): Parser;
}
