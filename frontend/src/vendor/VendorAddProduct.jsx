import { useState } from 'react'
import API from '../api';

export default function VendorAddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        instock: "",
    });

    const handleChange = (e)=>{
      setForm({...form,
        [e.target.name]: e.target.value
      });
    };
    const submitHandler = async (e)=>{
e.preventDefault();
try{
    const token = localStorage.getItem('token');
await API.post('/products', form, {
    headers:{
        Authorization: `Bearer ${token}`,
    }
});
alert("Product Added Sucessfully");
setForm({ name: "", price: "", description: "", instock: ""});
}
catch(error){
alert(error.response?.data?.message || "Error adding product");
}
    };


    return (
        <div className = "">
            <h2>Add Product</h2>
            <form onSubmit={submitHandler}>
             <input name="name" placeholder="Product Name" onChange={handleChange} value={form.name} /> <br />
             <input name="price" placeholder="Price" onChange={handleChange} value={form.price} /> <br />
             <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />  <br />
             <input name="instock" placeholder="instock" onChange={handleChange} value={form.instock} />  <br />
         <button>Add Product</button>
            </form>

        </div>
    )
}
