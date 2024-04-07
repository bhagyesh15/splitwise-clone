import React from 'react'

function ListComponent({ listTitle, listArray, className }) {
    return (
        <div className={'indExpenses flex-1 ' + className}>
            <p className="sectionTitle">{listTitle}</p>
            <ul>
                {listArray.map((listObject) => (
                    <li
                        key={listObject._id}
                        className="mt-2 flex justify-between"
                    >
                        <p>{listObject?.user2?.name}</p>
                        <div>
                            <p>{'₹' + listObject?.balance}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListComponent
