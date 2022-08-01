function MatchesScreen() {
    return (
        <div>
            {[5, 4, 3, 2, 1].map(user => {
                return <li>{user}</li>
            })}
        </div>
    )
}

export default MatchesScreen;


