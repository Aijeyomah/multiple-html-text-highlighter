import { v4 as uuidv4 } from 'uuid';
import { TextUtil } from "./utils/text.util";
import { Revision, Options, Parser, NewSpan } from "./utils/text.util.interface";

const textUtil = new TextUtil;
/**
 * 
 *
 * @export
 * @class TextParser
 */
export class TextParser {
    htmlText: string = '';
    targetText: string = '';
    options: Options | { prefix: string };
    originalTargetedText: string;
    highlightedHtmlResult: string;
    processedTargetedText: string;
    changeRevisions: Revision[];
    leftHtmlText: string;
    rightHtmlText: string;
    insertedWords: string;

    constructor(htmlText: string, targetText: string, options: Options | { prefix: string }) {
        this.htmlText = textUtil.stringifyHtml(htmlText);
        this.originalTargetedText = textUtil.stringifyHtml(targetText);
        this.targetText = this.originalTargetedText;
        this.targetText = textUtil.beginsWithOpenTag(this.targetText) ? textUtil.removeFirstOpeningTag(this.targetText) : this.targetText;
        this.targetText = textUtil.endsWithClosingTag(this.targetText) ? textUtil.removeLastClosingTag(this.targetText) : this.targetText;
        this.options = options;
        this.highlightedHtmlResult = this.htmlText;
        this.processedTargetedText = this.targetText;
        this.changeRevisions = [];
        this.leftHtmlText = '';
        this.rightHtmlText = '';
        this.insertedWords = '';
    }

    private updateChangeRevision(changeText: string, index: number, id: string) {

        const { prefix = '' } = this.options;
        const revision = {
            id: `${prefix}${id}`,
            text: changeText,
            startIndex: index,
            currentProcessedSearchText: this.processedTargetedText
        }

        this.changeRevisions.push(revision)
    }
    /**
     *
     *
     * @return {string} The whole html text with the the highleted text 
     * wrapped in a span with an id contaoining the prefix passed if the targerted text is present
     * @memberof TextParser
     */
    getHighlightedHtmlResult(): string {
        const targetedIndex: number = this.htmlText.indexOf(this.targetText);
       
        if (targetedIndex < 0) {
            return this.htmlText;
        }
        this.leftHtmlText = this.htmlText.substr(0, targetedIndex);
        this.rightHtmlText = this.htmlText.substr(this.targetText.length + targetedIndex)
        return `${this.leftHtmlText}${this.processedTargetedText}${this.rightHtmlText}`;
    }

    /**
     * get c
     *
     * @private
     * @param {number} index 
     * @return {number} - index of the targeted text after  open or close span tag
     * @memberof TextParser
     */
    private getNewIndexAfterRevisions(index: number):number {
        if (index === 0) return index;
        index = this.insertedWords.length + index;
        
        return index;
    }

    private addNewSpan(isLast: boolean): NewSpan {
        const id: string = uuidv4();
        const { prefix = '' } = this.options;
        const spanText: string = isLast ? '</span>' : `<span id='${prefix}${id}'>`;
        const span = {
            text: spanText,
            id: id
        }
        return span;
    }

    private saveUpdate(options: Options):void {
        const { spanText, index, id } = options;
        const leftPartIncludingCharAtIndex = this.processedTargetedText.substr(0, index);
        const rightPart = this.processedTargetedText.substr(index);
        if (leftPartIncludingCharAtIndex === '') {
            this.processedTargetedText = `${spanText}${rightPart}`;
        } else {
            this.processedTargetedText = `${leftPartIncludingCharAtIndex}${spanText}${rightPart}`;
        }
        this.insertedWords += spanText;
        this.updateChangeRevision(spanText, index, id);
    }

    private insertSpan(index: number, isLast: boolean = false): void{
        const { text: spanText, id } = this.addNewSpan(isLast);
        index = this.getNewIndexAfterRevisions(index)
        return this.saveUpdate({ spanText, index, id, isBeginning: false })
    }

    parser(): Parser {
        let seenNonTag: boolean = false;

        let seenStartTag: boolean = false;

        let charStartIndex: number = 0;


        for (let i: number = 0; i < this.targetText.length; i++) {
            const char: string = this.targetText[i];
            

            const isCharAtTheLastIndex: boolean = (i === this.targetText.length - 1);

            if (!textUtil.beginsWithOpenTag(char)) {
                if (seenStartTag) {
                    if (char === textUtil.checkTagInText().closingSign) {
                        seenNonTag = false;

                        charStartIndex = i;
                        seenStartTag = false;
                        continue;
                    } else {
                        // looking for the next closing tag
                        charStartIndex = i;
                        continue;
                    }
                } else {
                    if (!seenNonTag) {
                        charStartIndex = i;

                        seenNonTag = true;

                    } else {
                        if (isCharAtTheLastIndex) {
                            
                            this.insertSpan(charStartIndex)

                            const isLast: boolean = true;

                            this.insertSpan((i + 1), isLast)
                            break;
                        } else {
                            // Look ahead for more non tags
                            continue;

                        }
                    }
                }
            } else {
                if (seenStartTag) {
                    //<>
                    if (char === textUtil.checkTagInText().closingSign) {
                        seenNonTag = false;

                        charStartIndex = i;
                        seenStartTag = false;

                        continue;
                    } else {
                        // look for closing tag >
                        continue;
                    }
                } else {
                    seenStartTag = true;

                    if (seenNonTag) {
                        // insert opening span
                        this.insertSpan(charStartIndex)

                        const isLast: boolean = true;
                        //insert closing span
                        this.insertSpan(i, isLast)
                    }
                }
                charStartIndex = i;

                seenNonTag = false;

                /**
                * Keep skipping until we see end tag >
                */
            }

            if (isCharAtTheLastIndex) {
                const isLast = true;
                // Opening span
                this.insertSpan(charStartIndex);

                // Closing
                this.insertSpan(i + 1, isLast);
                break;
            }
        }
       
        
        return {
            revisionHistory: this.changeRevisions,
            processTargetedText: this.processedTargetedText,
            totalProcessedText: this.insertedWords,
            highlightedHtmlResult: this.getHighlightedHtmlResult(),
            initialTargetText: this.originalTargetedText,
            formattedTargetedText: this.targetText
        }
    }

}

