import Content from './styled/Content'
import Sidebar from './Sidebar'
import Header from './Header'
export default ({children})=>(
    <>
        <Sidebar/>
        <Header/>
        <Content>
            <section className="wrapper">
                {children}
            </section>
        </Content>
    </>
)