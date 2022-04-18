let servers = [
    {id: '1', name: 'AWS', status: "pending"},
    {id: '2', name: 'Google Cloud', status: "working"},
    {id: '3', name: 'Yandex Cloud', status: "working"},
    {id: '4', name: 'Microsoft', status: "pending"}
]

const getAll = (req, res) => {
    res.status(200).json(servers)
}

module.exports = getAll