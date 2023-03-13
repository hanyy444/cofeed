export default function ErrorMessage ({error}) {
    return (
        <p style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'red',
        }}>
            {error?.response?.data?.message || error?.message}
        </p>
    )
}