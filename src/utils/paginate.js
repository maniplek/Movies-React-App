import _ from 'lodash'

//Pagination on client side 

export function paginate(items, pageNumber, pageSize){
    /*to paginate the data we need to calculate the starting index of the items
     and pageNumber 
    */
   const startIndex = (pageNumber - 1) * pageSize

   /* then we go to this index using lodash and we take all the items of curent page: lodash slice method 
    when we get new array we can pick/take item in this array : lodash take method 
    the we will call this methods using a chain by first making lodash object and we can chain all lodash methods
    then we need convert that lodash wrapper object to an array using value()
   */
  
    return _(items).slice(startIndex).take(pageSize).value()
}