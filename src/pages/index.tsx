import React, { useState } from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"

interface Product {
  name: string
  description: string
  price: number
  image: {
    publicURL: string
  }
}

interface ProductsData {
  products: {
    nodes: Product[]
  }
}

const PageTitle = styled.h1`
  font-weight: bold;
`
const SearchInput = styled.input`
  font-size: 18px;
  height: 35px;
  border-radius: 5px;
  width: 250px;
  @media (max-width: 600px) {
    width: 80%;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProductList = styled.div`
  max-width: 1200px;
  margin-top: 10px;
  width: 80%;
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const ProductTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
`
const ProductDescription = styled.p`
  font-weight: 500;
  font-size: 18px;
`
const ProductPrice = styled.p`
  font-weight: 500;
  font-size: 18px;
`

const ProductImage = styled.img`
  max-width: 300px;
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`

const IndexPage: React.FC<PageProps<ProductsData>> = ({ data }) => {
  const { products } = data
  const [items, setItems] = useState(products.nodes || [])

  const onProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value
    const filteredItems = (products.nodes || []).filter((item: Product) => {
      return (
        item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.toLowerCase().includes(searchString.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(searchString.toLowerCase())
      )
    })
    setItems(filteredItems)
  }

  return (
    <Container>
      <PageTitle>Products</PageTitle>
      <SearchInput
        type="text"
        onChange={onProductSearch}
        placeholder="Filter items..."
      />
      <ProductList>
        {items.map((product: Product) => {
          return (
            <ProductContainer key={product.name}>
              <ProductImage src={product.image.publicURL} />
              <div>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
              </div>
            </ProductContainer>
          )
        })}
      </ProductList>
    </Container>
  )
}

export const query = graphql`
  query {
    products: allProductsJson {
      nodes {
        name
        description
        price
        image {
          publicURL
        }
      }
    }
  }
`

export default IndexPage
