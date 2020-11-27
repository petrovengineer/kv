import {useState} from 'react'
import Header from '../components/styled/Header'
import Title from '../components/styled/Title'
import CreateForm from '../components/Tranche/CreateForm'
import Message from '../components/Message'
import List from '../components/Tranche/List'
import Layout from '../components/Layout'

const Tranches = ()=>{
    const [message, showMessage] = useState(false);
    return (
            <Layout>
                <div className="content-panel" style={{marginTop:'15px'}}>
                    <h4>
                        <i className="fa fa-angle-right"></i> Поступления
                    </h4>
                    <table className="table table-striped table-advance table-hover">
                        <thead>
                            <tr>
                                <th><i className=" fa fa-calendar"></i> Дата</th>
                                <th><i className="fa fa-address-card-o"></i> Компания</th>
                                <th className="hidden-phone"><i className="fa fa-bookmark-o"></i> Ресурс</th>
                                <th><i className="fa fa-credit-card"></i> Сумма</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <CreateForm showMessage={showMessage}/>
                            <List/>
                        </tbody>
                    </table>
                </div>

                {/* {message?<Message message={message} error close={()=>{showMessage(false)}}/>:null} */}
            </Layout>

)}

export default Tranches