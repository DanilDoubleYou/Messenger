let servers = [
    {id: '1', name: 'AWS', status: "pending"          , url: "https://aws.amazon.com/"},
    {id: '2', name: 'Google Cloud', status: "working" , url: "https://www.google.com/"},
    {id: '3', name: 'Yandex Cloud', status: "working" , url: "https://cloud.yandex.ru/"},
    {id: '4', name: 'Microsoft', status: "pending"    , url: "https://www.microsoft.com/"}
]

export const getAll = (req, res) => {
    res.status(200).json(servers)
}