import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { screenWidth } from '@utils/Scaling'
const ProductSlider = () => {

    const rows = useMemo(() => {
        const result = []
        for (let i = 0; i < imageData?.length; i += 4) { // Fixed increment
            result.push(imageData.slice(i, i + 4))
        }
        return result
    }, [])

    // console.log({rows})

    return (
        <View pointerEvents='none'>
            <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000} >
                <View style={styles.gridContainer}>
                {rows.map((row: any, index: number) => {
                    return (<MemoizedRow key={index} row={row} rowIndex={index} /> // Use MemoizedRow
                    )
                })}
                </View>
            </AutoScroll>
        </View>
    )
}

const Row: FC<{ row: typeof imageData; rowIndex: number }> =
    ({ row, rowIndex }) => { 
        const horizontalShift = rowIndex %2 ===0 ? -18 :18
        return (
            <View key={rowIndex} style={[styles.row,{transform:[{translateX:horizontalShift}]}]}>
                {row.map((item: any, index: number) => { 
                    return (
                        <View key={index} style={styles.ImageContainer}>
                            <Image source={item} style={styles.image} />
                        </View>
                    )
                })}
            </View>
        )

    }

const MemoizedRow = React.memo(Row)

const styles = StyleSheet.create({
    ImageContainer:{
        marginBottom:12,
        marginHorizontal:10,
        width:screenWidth*0.26,
        height:screenWidth*0.26,
        backgroundColor:"#e9f7f8",
        justifyContent:"center",
        borderRadius:25,
        alignItems:"center"
    },
    image:{
        width:"100%",
        height:"100%",
        resizeMode:"contain",
    },
    autoScroll:{
        position:"absolute",
        zIndex:-2
    },
    gridContainer:{
        justifyContent:"center",
        overflow:"visible",
        alignItems:"center"
    },
    row:{
        flexDirection:"row",
        marginBottom:10
    }
})
export default ProductSlider