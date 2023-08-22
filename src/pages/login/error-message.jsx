export default function ErrorMessage ({ errorMessage }) {
    return (
        <p style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'red',
        }}>
            {/* 'Something went wrong! Please wait a moment and try again. */}
            {/* {error?.response?.data?.message || error?.message}  */}
            {errorMessage}
        </p>
    )
}