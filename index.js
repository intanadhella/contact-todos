let data = [];
axios.get('http://localhost:3000/contacts')
    .then((response) => {
        console.log(response)
        const listsHTML = document.querySelector("#contacts>ol")
        data = response.data;

        response.data.forEach(item => {
            const {name, address, email, phone, company, id} = item;
            const itemHTML = `<li class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">Name</div>
                        <div class="col-md-9">: ${name}</div>
                    </div>
                    <div class="row">
                    <br>
                        <div class="col-md-3">Address</div>
                        <div class="col-md-9">: ${address}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">Email</div>
                        <div class="col-md-9">: ${email}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">Phone</div>
                        <div class="col-md-9">: ${phone}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">Company</div>
                        <div class="col-md-9">: ${company}</div>
                    </div>
                    <div class="row pt-2">
                        <div class="col-md-6">
                            <button onclick="ubah(${id})" class="btn btn-primary btn-sm btn-block"><i class="fas fa-user-edit"></i></button>
                        </div>
                        <div class="col-md-6">
                            <button onclick="hapus(${id})" class="btn btn-warning btn-sm btn-block"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </li>`;
            listsHTML.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.error(pesanError);
    })

document.getElementById('simpanContact').addEventListener('click',function(event){
    
    const name = document.getElementsByName('name')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    const company = document.getElementsByName('company')[0].value;
    axios.post('http://localhost:3000/contacts', {
        name,
        address,
        email,
        phone,
        company
    })
})

const hapus = id => {
    axios.delete(`http://localhost:3000/contacts/${id}`)
}

const ubah = id => {
    const contact = data.find(item => {
        return item.id === id
    })
    
    if (contact){
        const name = window.prompt('Name',contact.name);
        const address = window.prompt('address', contact.address);
        const email = window.prompt('email', contact.email);
        const phone = window.prompt('phone', contact.phone);
        const company = window.prompt('company', contact.company);
        axios.put(`http://localhost:3000/contacts/${id}`,{
            name,
            address,
            email,
            phone,
            company
        
        });
    }
}