const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }
    request.token = token
    next()
}

module.exports = {
    tokenExtractor,
}