const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const urlMovie = 'http://localhost:4001/movies'
const urlSeries = 'http://localhost:4002/series'
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type EntertaintMe {
    movies: [Movie],
    series: [Series]
  }

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    series: [Series]
    seriesById(_id: ID): Series
    entertaintMe: EntertaintMe
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    createMovie(data: MovieInput): Movie
    updateMovie(_id: ID, data: MovieInput): Movie
    deleteMovie(_id: ID): Movie

    createSeries(data: MovieInput): Series
    updateSeries(_id: ID, data: MovieInput): Series
    deleteSeries(_id: ID): Series
  }
`

const resolvers = {
  Query: {
    entertaintMe: async () => {
      try {
        const entertaintData = await redis.get('entertaintData:data')

        if (entertaintData) {
          return JSON.parse(entertaintData)
        } else {
          const dataMovies = await axios.get(urlMovie)
          const dataSeries = await axios.get(urlSeries)
          
          const response = {
            movies: dataMovies.data,
            series: dataSeries.data
          }

          redis.set('entertaintData:data', JSON.stringify(response))

          return response
        }
      } catch (error) {
        return error
      }
    },

    movies: async () => {
      try {
        const moviesData = await redis.get('movies:data')

        if (moviesData) {
          return JSON.parse(moviesData)
        } else {
          const { data } = await axios.get(urlMovie)

          redis.set('movies:data', JSON.stringify(data))
          return data
        }
      } catch (error) {
        return error
      }
    },

    series: async () => {
      try {
        const seriesData = await redis.get('series:dataSeries')


        if (seriesData) {
          return JSON.parse(seriesData)
        } else {
          const { data } = await axios.get(urlSeries)

          redis.set('series:dataSeries', JSON.stringify(data))

          return data
        }
      } catch (error) {
        return error
      }
    },

    movie: async (_, args) => {
      try {
        const id = args._id
        const { data } = await axios.get(`${urlMovie}/${id}`)

        return data[0]
      } catch (error) {
        return error
      }
    },

    seriesById: async (_, args) => {
      try {
        const id = args._id
        const { data } = await axios.get(`${urlSeries}/${id}`)
        redis.set('movieById:dataById', JSON.stringify(data[0]))

        return data[0]
      } catch (error) {
        return error
      }
    }
  },

  Mutation: {
    createMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        await redis.del('entertaintData:data')
        
        const { data } = await axios.post(urlMovie, args.data)

        return data.ops[0]
      } catch (error) {
        console.log(error)
      }
    },
    updateMovie:async (_, args) => {
      try {
        await redis.del('movies:data')
        const id = args._id
        
        const { data } = await axios.put(`${urlMovie}/${id}`, args.data)

        console.log(data, 'from update')
      } catch (error) {
        console.log(error) 
      }
    },
    deleteMovie:async (_, args) => {
      try {
        await redis.del('movies:data')
        const id = args._id
        
        await axios.delete(`${urlMovie}/${id}`)

        return `Berhasil!`
      } catch (error) {
        console.log(error)
      }
    },

    createSeries: async (_, args) => {
      try {
        await redis.del('series:dataSeries')
        await redis.del('entertaintData:data')
        
        const { data } = await axios.post(urlSeries, args.data)

        return data
      } catch (error) {
        console.log(error)
      }
    },
    updateSeries:async (_, args) => {
      try {
        await redis.del('series:dataSeries')
        const id = args._id
        
        const { data } = await axios.put(`${urlSeries}/${id}`, args.data)

        console.log(data, 'ini data')
      } catch (error) {
        console.log(error) 
      }
    },
    deleteSeries:async (_, args) => {
      try {
        await redis.del('series:dataSeries')
        const id = args._id
        
        await axios.delete(`${urlSeries}/${id}`)

        return `Berhasil!`
      } catch (error) {
        console.log(error)
      }
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
