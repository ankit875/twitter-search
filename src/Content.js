import React from 'react'

const Content= ({data}) =>{
    const list= data.map((item) =>
        <li key= {item.id} className= "list-item">{item.text}</li>)
    return <ul className= "content-list">{list}</ul>
}

export default Content