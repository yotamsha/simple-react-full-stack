  export const User = {
    update: (id, data) => {
        fetch('/api/users/' + id, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
        }) 
    }
}