
export default function EachCustomer({ customer }) {

    return (
        <div className="bg-slate-100 rounded-lg mb-4 p-4 hover:border hover:border-purple-700">
            <div>
                <div>
                    <div>
                        <div className="customer-photo">
                            <img src="https://openclipart.org/download/247319/abstract-user-flat-3.svg" alt=""/>
                        </div>
                    </div>
                    <div className="font-medium"><h2 style={{ fontSize: 30, color: 'blue' }}>{customer.name}</h2></div>
                    <div className="text-slate-400">
                        <h4 style={{ fontSize: 20, color: 'green' }}>{customer.grade}</h4>
                    </div>
                    <div className="text-slate-400">{customer.description}</div>
                </div>
            </div>
        </div>
    )
}
