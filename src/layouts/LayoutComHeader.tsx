import Header from '../components/Header'

type Props = {
  children: React.ReactNode
}

const LayoutComHeader = ({ children }: Props) => (
  <>
    <Header />
    <div className="container">{children}</div>
  </>
)

export default LayoutComHeader
