/**
 * roundTo
 * @param {Number} value 
 * @param {Number} digits 
 * @returns {Number}
 */

module.exports.roundTo = (value,digits) => parseFloat(value.toFixed(digits));

 /**
 * initialises a matrix with length*length dimensions and value:value to all elements
 * @param {*} length 
 * @param {*} value 
 * @returns arr
 */
const initMatrix = (length, value) =>{
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = [];
        for (let j = 0; j < length; j++) {
            arr[i][j] = value;
        }
    }
    return arr;
}

/**
 * expenseShareUtil - performs calculations based on details provided of paidBy and sharedBy, 
 * returns finalShare and oweList object
 * @param {Array} paidBy { userId: ObjectId, share: integer}
 * @param {Array} sharedBy { userId: ObjectId, share: integer}
 * @returns {Object}
 */
module.exports.expenseShareUtil = (paidBy,sharedBy) =>{
    let finalShare = [];
    for(const user of sharedBy){
        console.log(user);
        finalShare.push({
            userId: user.userId,
            share: -user.share
        });
    }
    for(const user of paidBy){
        let index = finalShare.findIndex(obj => obj.userId === user.userId)
        if(index === -1){
            finalShare.push(user);
        }
        else {
            finalShare[index].share += user.share 
        }
    }
    console.log("finalShare : ");
    console.log(finalShare);

    let n = finalShare.length;
    let users = finalShare.map(({userId})=>userId);
    let shares = finalShare.map(({share})=>share);
    let updatedShare = shares;
    let matrix = initMatrix(n,0);
    let oweList = [];

    // if(sumArray(shares) === 0){
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                
                //case 1 - no point of checking same indices
                if(i==j){
                    continue;
                }

                //case 2 - for a neg share,find a pos share, the neg will owe the pos

                else if(updatedShare[i]<0 && updatedShare[j]>0){
                    console.log("before",i,j,updatedShare[i],updatedShare[j]);
                    //the person i owes more than person j needs, j's share now is 0
                    if(Math.abs(updatedShare[i]) >= Math.abs(updatedShare[j])){
                        console.log("if");

                        oweList.push({
                            user1Id:users[i],
                            user2Id:users[j],
                            owes:this.roundTo(updatedShare[j],2)
                        })
                        matrix[i][j] = updatedShare[j];
                        updatedShare[i] += updatedShare[j];
                        updatedShare[j] = 0;
                    }

                    //the person i owes less than person j needs, i's debt now is 0
                    else{
                        console.log("else");
                        
                        oweList.push({
                            user1Id:users[i],
                            user2Id:users[j],
                            owes:this.roundTo(-updatedShare[i],2)
                        })
                        matrix[i][j] = Math.abs(updatedShare[i]);
                        updatedShare[j] += updatedShare[i];
                        updatedShare[i] = 0;
                    }

                    console.log("after",i,j,updatedShare[i],updatedShare[j]);
                }   
            }
        }
    // }
    // else{
    //     return null;
    // }

    console.table(matrix);
    console.table(oweList);

    const sum = updatedShare.filter((x)=>x===0);
    // if(sum.length() === n);

    return {oweList,finalShare};
}