import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const NutritionTracker = ({ navigation }) => {
    const nutritionData = [
        {
            name: "Fat",
            value: 90,
            percentage: 46,
            color: "#59DBDD",
            radius: 69,
        },
        {
            name: "Protein",
            value: 150,
            percentage: 66,
            color: "#9973D7",
            radius: 88,
        },
        {
            name: "Carbs",
            value: 290,
            percentage: 72,
            color: "#7C83ED",
            radius: 108,
        },
    ];

    const CircleProgress = ({ percentage, color, radius }) => {
        const circumference = 2 * Math.PI * radius;
        const progress = useSharedValue(0);

        const animatedProps = useAnimatedProps(() => {
            const strokeDashoffset = circumference - (progress.value / 100) * circumference;
            return {
                strokeDashoffset,
            };
        });

        useEffect(() => {
            progress.value = withTiming(percentage, { duration: 1000 });
        }, [percentage]);

        return (
            <Svg>
                <Circle strokeWidth={16} stroke="#F4F6FA" fill="transparent" r={radius} cx="120" cy="120" />
                <AnimatedCircle
                    strokeWidth={16}
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                    stroke={color}
                    fill="transparent"
                    r={radius}
                    cx="120"
                    cy="120"
                />
            </Svg>
        );
    };

    const AnimatedPercentageText = ({ targetPercentage, main }) => {
        const [displayPercentage, setDisplayPercentage] = useState(0);
        const animatedPercentage = useSharedValue(0);

        useEffect(() => {
            animatedPercentage.value = withTiming(targetPercentage, {
                duration: 1000,
            });

            const interval = setInterval(() => {
                setDisplayPercentage(Math.round(animatedPercentage.value));
            }, 16);

            return () => clearInterval(interval);
        }, [targetPercentage]);

        return (
            <>
                {main ? (
                    <Text style={styles.mainPercentageText}>{displayPercentage}%</Text>
                ) : (
                    <Text style={styles.subPercentageText}>{displayPercentage}%</Text>
                )}
            </>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer1}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            resizeMode="contain"
                            source={require("../assets/icons/back.png")}
                            style={styles.leftArrow}
                            accessibilityLabel="Left arrow"
                        />
                    </TouchableOpacity>

                    <View style={styles.stepsContainer}>
                        <Text style={styles.stepsText}>Nutrition</Text>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        You have consumed
                        <Text style={styles.highlightText}> 960 kcal </Text>
                        today
                    </Text>
                </View>

                <View style={styles.svgContainer}>
                    <Svg style={styles.svg} viewBox="0 0 240 240">
                        {nutritionData.map((item, index) => (
                            <CircleProgress
                                key={index}
                                percentage={item.percentage}
                                color={item.color}
                                radius={item.radius}
                            />
                        ))}
                    </Svg>
                    <View style={styles.svgOverlay}>
                        <AnimatedPercentageText targetPercentage={60} main />
                        <Text style={styles.totalText}>of 1300 kcal</Text>
                    </View>
                </View>

                <View style={styles.nutritionList}>
                    {nutritionData.map((item, index) => (
                        <View key={index} style={styles.nutritionItem}>
                            <View style={styles.itemLabelContainer}>
                                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                            <Text style={styles.itemValue}>{item.value}g</Text>
                            <AnimatedPercentageText targetPercentage={item.percentage} />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Button pressed')}>
                    <Image source={require('../assets/icons/meals.png')} style={styles.buttonImage} resizeMode="contain" />
                    <Text style={styles.buttonText}>Add meals</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 20,
        width: 196,
        maxWidth: "100%",
        alignItems: "stretch",
        gap: 20,
        justifyContent: "space-between",
    },
    leftArrow: {
        position: "relative",
        display: "flex",
        marginTop: "auto",
        marginBottom: "auto",
        width: 16,
        flexShrink: 0,
        aspectRatio: 1,
    },
    stepsText: {
        fontFamily: "Outfit, sans-serif",
        fontSize: 20,
        color: "rgba(23, 26, 31, 1)",
        fontWeight: "500",
        textAlign: "center",
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        marginTop: 40,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 36,
        color: '#333',
    },
    highlightText: {
        color: '#686fea',
    },
    svgContainer: {
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    svg: {
        width: 240,
        height: 240,
        transform: [{ rotate: '-90deg' }],
    },
    svgOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainPercentageText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#333',
    },
    subPercentageText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalText: {
        fontSize: 14,
        color: '#9095A0',
    },
    nutritionList: {
        marginTop: 40,
        paddingHorizontal: 20,
        gap: 16,
    },
    nutritionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: 'rgba(23, 26, 31, 0.2)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    itemLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    colorIndicator: {
        height: 24,
        width: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    itemValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginRight: 70,
    },
    buttonContainer: {
        backgroundColor: '#535CE8',
        marginTop: 35,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonImage: {
        width: 24,
        height: 24,
        marginRight: 8,
    }
});

export default NutritionTracker;
