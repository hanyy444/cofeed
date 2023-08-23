import './index.scss'
import Spinner from 'components/display/spinner/spinner.component'
export default function Button({ children, isLoading, ...props }) {
  return (
    <button className={`button ${isLoading ? 'disabled' : '' }`} disabled={isLoading} {...props}>
        { isLoading ? <Spinner/> : children}
    </button>
  )
}
