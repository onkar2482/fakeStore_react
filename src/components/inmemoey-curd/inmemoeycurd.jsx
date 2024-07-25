import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export function Inmemorycurd(){

    const[products,setProducts]=useState([{id:1,name:'Tv'},{id:2,name:'Mobile'}])
    const[newproduct,setnewproduct]=useState({id:0,name:''})
    
    const[activeproductid,setactiveproductid]=useState()
    const[newname,setnewname]=useState('')

    

    function handleidchange(e){
        setnewproduct({
            id:parseInt(e.target.value),
            name:newproduct.name
        })
        
    }

    function handlenmaechange(e){
        setnewproduct({
            id:newproduct.id,
            name:e.target.value
        })
    }

    function hanleaddclick(){
     setProducts([...products,newproduct])
       
        alert("product succesufully Add")
        setnewproduct({id:0,name:''})

    }

    function deletehandle(index){
        var flag=window.confirm("are you sure\nawant to Delete?")
        if(flag===true){
            products.splice(index,1)
            setProducts([...products])
            setnewproduct({id:0,name:''})
        }
    }

    function handleeditclick(id){
        setactiveproductid(id);
        setnewname(products.find(product=>product.id===id).name)

    }

    function handlesaveclick(id){
        setactiveproductid(0);
        var editname=products.find(product=> product.id==id)
        editname.name=newname
        
    }

    function handlenamechangeonEdit(e){
        setnewname(e.target.value)
        
        

    }

 

    return(
        <div className="container-fluid">
            <h2>Testing curd</h2>
            <div>
            <label>Add New Product</label>
            <div>
                <dl>
                    <dt>product id</dt>
                    <dd>
                        <input type='number'value={newproduct.id} onChange={handleidchange}></input>
                    </dd>
                    <dt>Name</dt>
                    <dd><input type="text" value={newproduct.name} onChange={handlenmaechange}></input></dd>
                </dl>
                <button className="btn btn-success " onClick={hanleaddclick}>Add product</button>
            </div>
            </div>
            <table className="table table-hover">

                <thead>
                    <th>Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                  {
                    products.map((product,index)=>
                        <tr key={index}>
                            <td>{(product.id==activeproductid)?<input type="text" onChange={handlenamechangeonEdit} value={newname}></input>:<label>{product.name}</label>}</td>
                            <td >
                               {(product.id==activeproductid)?<button onClick={()=> handlesaveclick(product.id)} className="btn btn-success bi bi-floppy me-2"></button>: <button className="bi bi-pencil-square btn btn-warning me-2" onClick={()=>handleeditclick(product.id)}></button>}
                                <button className="bi bi-trash btn btn-danger me-2" onClick={()=> {deletehandle(index)}}></button>
                            </td>
                        </tr>
                    )
                  }
                </tbody>

            </table>
        </div>
    )
}