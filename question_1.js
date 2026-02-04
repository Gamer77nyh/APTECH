function findNumberIndex(str) {
    for (let i = 0; i < str.length; i++) {
       
        if (str[i] >= '0' && str[i] <= '9') {
           
            if (parseInt(str[i]) == i) {
                return i;
            }
        }
    }
    return -1;
}

console.log(findNumberIndex("Doug4as"));
