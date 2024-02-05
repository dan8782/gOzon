import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container, Input, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import HeaderBar from './HeaderBar';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    name: string;
    image: string; // in base64 
    description: string;
    vendorInfo: string;
    price: number;
}

const MainPage: React.FC = () => {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]); // для фильтрации
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('');
    const nameStorage = localStorage.getItem('name'); // Replace 'yourKey' with the actual key you use in local storage

    const handleAddToCart = async (productId: number) => {
        try {
            await axios.put('http://localhost:3001/cart', { productId }, {
                headers: {
                    'authorization': `Bearer ${nameStorage}`,
                    'productid': productId,
                },
            });
    
            console.log(`Product with id ${productId} added to the cart`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleSearch = useCallback(() => {
        const filteredProducts = originalProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setProducts(filteredProducts);
    }, [originalProducts, searchTerm]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = useCallback(() => {
        let sortedProducts;
        switch (sortOption) {
            case 'priceAsc':
                sortedProducts = [...products].sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                sortedProducts = [...products].sort((a, b) => b.price - a.price);
                break;
            case 'nameAsc':
                sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDesc':
                sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                sortedProducts = [...products];
        }
        setProducts(sortedProducts);
    }, [products, sortOption]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                const fetchedProducts = response.data;
                setOriginalProducts(fetchedProducts);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [handleSearch, searchTerm])

    useEffect(() => {
        handleSort(); // Вызывайте handleSort при изменении sortOption
    }, [handleSort, sortOption]);


    return (
        <Box display="flex">
            <HeaderBar />
            <Container sx={{ paddingTop: 10 }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        marginBottom={2}
                    >
                        <FormControl sx={{ width: '70%' }}>
                            <InputLabel htmlFor="search">Поиск</InputLabel>
                            <Input
                                id="search"
                                type="text"
                                value={searchTerm}
                                onInput={handleInput}
                            />
                        </FormControl>

                        <FormControl sx={{ width: '30%' }}>
                            <Select
                                id="sort"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as string)}
                            >
                                <MenuItem value="">Нет</MenuItem>
                                <MenuItem value="priceAsc">По возрастанию цена</MenuItem>
                                <MenuItem value="priceDesc">По убыванию цена</MenuItem>
                                <MenuItem value="nameAsc">По возрастанию имя</MenuItem>
                                <MenuItem value="nameDesc">По убыванию имя</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 24 }} style={{ justifyContent: 'center' }}>
                        {products.map((product) => (
                            <Grid item xs={5}>
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    description={product.description}
                                    price={product.price}
                                    onAddToCart={handleAddToCart}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default MainPage;
