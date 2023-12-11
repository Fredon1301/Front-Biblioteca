const httpService = {
    login: (data) => {
        return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }, 
    createUser: (data) => {
        return fetch("http://localhost:3333/api/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(data)
        })

    },

    createBook: (data) => {
        return fetch("http://localhost:3333/api/book",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },  
            body: JSON.stringify(data)
        })

    },

    getUser: (data) => {
         return fetch("http://localhost:3333/api/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")

            },
                    })  
    },
    getBooks: (data) => {
        return fetch("http://localhost:3333/api/book",
       {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("token")

           },
                   })  
   },
   updateBook: (data) => {
    return fetch("http://localhost:3333/api/book",
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },  
        body: JSON.stringify(data)
    })

},
deleteBook: (data) => {
    return fetch("http://localhost:3333/api/book",
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },  
        body: JSON.stringify(data)
    })

},
createCart: (data) => {
    return fetch("http://localhost:3333/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },  
      body: JSON.stringify(data)
    });
  },
deleteCart: (data) => {
    return fetch("http://localhost:3333/api/cart",
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },  
        body: JSON.stringify(data)
    })

},
    
}
export default httpService