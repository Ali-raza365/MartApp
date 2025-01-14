import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData'

const ProductSlider = () => {

    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < imageData?.length; i + 4) {
            result.push(imageData.slice(i, i + 4))
        }
        return result
    }, [])

    return (
        <View pointerEvents='none'>
            <View>
                {rows.map((row: any, index: number) => {
                    return (<MemoizedRow key={index} row={row} rowIndex={index} />
                    )
                })}
            </View>
        </View>
    )
}

const Row: FC<{ row: typeof imageData; rowIndex: number }> =
    (row: any, rowIndex: number) => {
        return (
            <View>
                {row.map((item: any, index: number) => {
                    return (
                        <View>
                            <Image source={item} />
                        </View>
                    )
                })}
            </View>
        )

    }

const MemoizedRow = React.memo(Row)

const styles = StyleSheet.create({
    
})
export default ProductSlider