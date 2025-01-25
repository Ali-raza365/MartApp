import CustomHeader from '@components/ui/CustomHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);
  return (
    <View style={styles.mainContainer}>
       <CustomHeader title={selectedCategory?.name || "Categories"} search />

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCategories;