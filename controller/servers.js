let servers = [
    {id: '1', name: 'AWS', status: "pending", url: "https://aws.amazon.com/ru/"},
    {id: '2', name: 'Google Cloud', status: "working", url: "https://cloud.google.com/"},
    {id: '3', name: 'Yandex Cloud', status: "working", url: "https://aws.amazon.com/ru/"},
    {id: '4', name: 'Microsoft', status: "pending", url: "https://aws.amazon.com/ru/"}
]

const getAll = (req, res) => {
    res.status(200).json(servers)
}

module.exports = getAll