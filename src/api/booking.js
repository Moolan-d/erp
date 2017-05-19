import { client } from "./index"

function createBooking(formData) {
        
    let query = `
    {
        booking:createBooking(
            receiptFee: ${formData.receiptFee}, 
            source: "${formData.source}", 
            receiverName: "${formData.receiverName}",
            receiverPhone: "${formData.receiverPhone}",
            receiverAddress: "${formData.receiverAddress}",
            memo: "${formData.memo}",
            orders: "${formData.orders}"
        ) {
            id,
            source
        }
    }
    `
    return client.mutate(query);

}

function getBooking({id, fields="id"}) {
    let query = `
    {
        booking:booking(id: ${id}) {
            ${fields}
        }
    }
    `
    return client.query(query);
}

function getBookings({page=1, limit=15, order="createdAt DESC", filters={}, fields="id"}) {

    let query = `
    {
        bookings:bookings(
            page: ${page}, 
            limit: ${limit}, 
            order: "${order}", 
            filters: "${JSON.stringify(filters).replace(/"/g, '\\"')}"
        ) {
            rows {
                ${fields}
            },
            page,
            pages,
            limit
        }
    }
    `
    return client.query(query);
}

function updateBookingStatus({ status, id }) {

    let query = `
    {
        booking: updateBookingStatus(status: "${status}", id: ${id}) {
            id
        }
    }
    `
    return client.mutate(query);

}

function deliverBooking(data) {
    
    let query = `
    {
        booking: deliverBooking(
            booking: ${data.booking},
            outRepos: "${JSON.stringify(data.outRepos).replace(/"/g, '\\"')}"
        ) {
            id
        }
    }
    `
    return client.mutate(query);

}

function shipBooking({data={}, fields="id" }) {
    
    let query = `
    {
        booking: shipBooking(
            name: "${data.name}",
            number: "${data.number}",
            outRepos: "${data.outRepos}",
            booking: ${data.booking}
        ) {
            ${fields}
        }
    }
    `
    return client.mutate(query);
}

function getBookingShips({fields="id", order="createdAt DESC", filters={}}) {
    let query = `
    {
        ships: ships(
            filters="${JSON.stringify(filters).replace(/"/g, '\\"')}", 
            order="${order}") {
                ${fields}
        }
    }
    `
    return client.query(query);
}

export {
    getBooking,
    createBooking,
    getBookings,
    updateBookingStatus,
    deliverBooking,
    shipBooking,
    getBookingShips
}