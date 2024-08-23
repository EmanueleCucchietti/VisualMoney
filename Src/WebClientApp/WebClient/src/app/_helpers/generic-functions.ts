import { CategoryModel } from "../_models/Category/CategoryModel";

export class GenericFunctions{
    static DifferenceCategoryLists(list1 :CategoryModel[], list2: CategoryModel[]){
        let list3 = [];

        let isElementInList = (ls : CategoryModel[], elem : CategoryModel) =>{
            for (const element of ls) {
                if(element.id == elem.id)
                    return true;
            }
            return false;
        }

        for (const element of list1) {
            if(!isElementInList(list2,element))
                list3.push(element);
        }

        return list3;
    }
}