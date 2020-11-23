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
                        <i class="fa fa-angle-right"></i> Поступления
                    </h4>
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th><i class=" fa fa-calendar"></i> Дата</th>
                            <th><i class="fa fa-address-card-o"></i> Компания</th>
                            <th class="hidden-phone"><i class="fa fa-bookmark-o"></i> Ресурс</th>
                            <th><i class="fa fa-credit-card"></i> Сумма</th>
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