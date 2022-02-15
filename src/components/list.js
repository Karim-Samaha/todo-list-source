import React from "react";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const List = ({ items, edit, remove, markDone }) => {

    return <section className="list-section">
        {items.map((item) => {
            const { id, title } = item;
            return <div key={id} className="list-container">

                <article id={id} className="list-item">{title}
                </article>

                <article className="logo">
                    <span onClick={() => markDone(id)}>Done</span>
                    <AiFillEdit onClick={() => edit(id)} size="20px" />
                    <AiFillDelete onClick={() => remove(id)} size="20px" />
                </article>
            </div>


        })}

    </section>
}

export default List;
