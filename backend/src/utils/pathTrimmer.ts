export interface IPathTrimmer{ 
    items?:any,
    newItems?:any
}

export const pathTrimmer = ({items,newItems}:IPathTrimmer) =>{ 
    if (items.length>0) {
        items.forEach((item:any) => {
            const fullPath = item; 
            // Find the index where "public" starts in the full path
            const publicIndex = fullPath.indexOf('public');
            // Extract the path starting from "public"
            const relativePath = fullPath.substring(publicIndex);
            newItems.push(relativePath);
        });
    }
    return newItems
}
