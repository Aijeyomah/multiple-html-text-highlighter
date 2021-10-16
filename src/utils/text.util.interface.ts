export interface TagType {
    openingTag: string;
    closingTag: string;
}

export interface TagIndexes {
    tagStartIndex: number, 
    tagEndIndex: number;
    targetedText: string;
}

export interface Revision{
    id: string,
    text: string,
    startIndex: number,
    currentProcessedSearchText: string
};

export interface Options{
    spanText: string, 
    index: number, 
    id:string,
    isBeginning: boolean,
    prefix?: string,

}


export interface Parser{
    revisionHistory :Revision[],
    processTargetedText: string,
    totalProcessedText: string,
    highlightedHtmlResult: string,
    initialTargetText: string,
    formattedTargetedText: string
}