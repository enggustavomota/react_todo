import { useState } from "react";

function FormInputs({ x }) {

    const [titleField, setTitleField] = useState();

    const [descriptionField, setDescriptionField] = useState();

    const [categoryField, setCategoryField] = useState();

    const [saveFormData, setSaveFormData] = useState([]); //array vazia

    const [idx, setIdx] = useState(false); //Id usado para atualizar o estado

    const [itemToEdit, setItemToEdit ] = useState(null);

    x = saveFormData.length

    function removeFormData(idx) { //Filtra os itens existentes com id diferente do selecionado e retorna somente eles(exclui o item)
        const filtrados = saveFormData?.filter((element, index) => index !== idx);
        delete (saveFormData?.filter((element, index) => index === idx))
        console.log(filtrados)
        setSaveFormData(filtrados)
    }

    return (
        <>
            <label htmlFor="Title" className="inputLabel">Title</label><br />
            <input
                type="text"
                name="Title"
                className="inputFields"
                defaultValue={titleField}
                maxLength={50}
                onBlur={(e) => { setTitleField(e.target.value); }}
            //Toda vez que sair do campo, guardar o valor do input
            /><br />
            <label htmlFor="Desc" className="inputLabel" >Description</label><br />
            <input
                type="text"
                name="Desc"
                defaultValue={descriptionField}
                className="inputFields"
                onBlur={(e) => { setDescriptionField(e.target.value); }}
            /><br />

            <label htmlFor="Option" className="inputLabel">Category</label><br />
            <select name="Option" className="inputFields"
                onBlur={(e) => {
                    setCategoryField(e.target.value);
                }}>
                    <option disabled selected value></option>
                    <option value={"Task"}>Task</option>
                    <option value={"Bug"}>Bug</option>
                    <option value={"Performance"}>Performance</option>
                    <option value={"Improve"}>Improve</option>
            </select><br />

            <button type="button" id="buttonConfirm" onClick={() => {
                const novoArray = saveFormData; //novoArray = saveFormData = array vazia

                console.log(descriptionField)
                console.log(titleField)
                console.log(categoryField)

                categoryField != undefined && descriptionField != undefined && titleField != undefined ? novoArray.push({ //Criar um objeto na lista contendo title e description
                    title: titleField,
                    description: descriptionField,
                    category: categoryField,
                    isOpenToEdit: false
                }) : window.alert("Por favor, preencha todos os campos para anexar uma task.")

                const valueInputs = document.querySelectorAll(".inputFields")

                valueInputs.forEach((e) =>{ /*Trocar por método em React*/
                        e.value = ""
                })

                setSaveFormData(novoArray); //Definir o valor do state como o novo valor da array(com o objeto adicionado)

                setIdx(!idx); //Trocando o ID para mudar o estado, pois o push() é um método da array, logo o React nao identifica como mudança de estado

                setDescriptionField(undefined)
                setTitleField(undefined)
                setCategoryField(undefined)

            }}>Save</button>
            <div id="showTasks">
            {
                saveFormData.map((item, idx) => ( //Retornando uma cópia da array com .map
                    <div key={idx} id="toDoTasks"> {/*Identificador*/}

                     <div id="divContent">
                          <p hidden={idx == itemToEdit}><strong style={{fontSize: 18}}>{item.title}</strong></p>{/*Retornando o título*/}
                        
                        <input type="text" hidden={idx !== itemToEdit} defaultValue={saveFormData[idx].title} id="changeInput" onBlur={(e) => {
                                        
                                        const a = saveFormData;

                                        a[idx].title = e.target.value
                                        
                                        setSaveFormData(a);

                                        setItemToEdit(null)
                                        
                                        setIdx(!idx)
                        }} />
                        <p>{item.description}</p>{/*Retornando a descrição*/}
                        <p style={{ fontSize: 14 }}>{item.category}</p>  
                        </div>
                        <div id="divButtons">
                            <button className="actionButtons" onClick={() => { setItemToEdit(idx); }}>✏️</button>
                            <button className="actionButtons" onClick={() => removeFormData(idx)}>❌</button>
                        </div>
                       
                        
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default FormInputs;