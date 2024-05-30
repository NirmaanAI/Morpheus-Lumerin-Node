# sample.py - This Script contains sample data

def get_model_data(model_name: str):
    data = {
        "Llama 2.0": {
            "graphData": {
                "_id": "1",
                "name": "Llama 2",
                "icon": "bi bi-bar-chart",
                "amount": 762,
                "label": "View Details",
                "href": "https://mor.org",
                "dataPoints": [
                    {"date": "2024-01-01", "valueAvgDaily": 120, "valueActive": 100},
                    {"date": "2024-02-01", "valueAvgDaily": 150, "valueActive": 180},
                    {"date": "2024-03-01", "valueAvgDaily": 180, "valueActive": 160},
                    {"date": "2024-04-01", "valueAvgDaily": 200, "valueActive": 220},
                    {"date": "2024-05-01", "valueAvgDaily": 210, "valueActive": 190}
                ]
            },
            "tableData": [
                {
                    "_id": 1,
                    "address": "0xab3d4eaffb2a8cc3f143e0a5ab251841524fa456",
                    "totalSessionsCompleted": 821,
                    "modelSessionsCompleted": 282,
                    "avgResponseTime": "12 ms",
                    "ipsAsk": "10.232 MOR/IPS",
                    "view": "https://example.com"
                },
                {
                    "_id": 2,
                    "address": "0xab3d4eaffb2a8cc3f143e0a5ab251841524fa456",
                    "totalSessionsCompleted": 1030,
                    "modelSessionsCompleted": 390,
                    "avgResponseTime": "10 ms",
                    "ipsAsk": "9.876 MOR/IPS",
                    "view": "https://example.com"
                }
            ]
        },
        "StableLm": {
            "graphData": {
                "_id": "2",
                "name": "StableLm",
                "icon": "bi bi-bar-chart",
                "amount": 850,
                "label": "View Details",
                "href": "https://mor.org",
                "dataPoints": [
                    {"date": "2024-01-01", "valueAvgDaily": 110, "valueActive": 90},
                    {"date": "2024-02-01", "valueAvgDaily": 140, "valueActive": 170},
                    {"date": "2024-03-01", "valueAvgDaily": 160, "valueActive": 150},
                    {"date": "2024-04-01", "valueAvgDaily": 190, "valueActive": 210},
                    {"date": "2024-05-01", "valueAvgDaily": 200, "valueActive": 180}
                ]
            },
            "tableData": [
                {
                    "_id": 1,
                    "address": "0xabcdef1234567890abcdef1234567890abcdef12",
                    "totalSessionsCompleted": 900,
                    "modelSessionsCompleted": 300,
                    "avgResponseTime": "11 ms",
                    "ipsAsk": "8.232 MOR/IPS",
                    "view": "https://example.com"
                },
                {
                    "_id": 2,
                    "address": "0xabcdef1234567890abcdef1234567890abcdef12",
                    "totalSessionsCompleted": 1050,
                    "modelSessionsCompleted": 400,
                    "avgResponseTime": "9 ms",
                    "ipsAsk": "9.123 MOR/IPS",
                    "view": "https://example.com"
                }
            ]
        },
        "Llama 3.0": {
            "graphData": {
                "_id": "3",
                "name": "Llama 3",
                "icon": "bi bi-bar-chart",
                "amount": 900,
                "label": "View Details",
                "href": "https://mor.org/",
                "dataPoints": [
                    {"date": "2024-01-01", "valueAvgDaily": 130, "valueActive": 110},
                    {"date": "2024-02-01", "valueAvgDaily": 160, "valueActive": 190},
                    {"date": "2024-03-01", "valueAvgDaily": 190, "valueActive": 170},
                    {"date": "2024-04-01", "valueAvgDaily": 210, "valueActive": 230},
                    {"date": "2024-05-01", "valueAvgDaily": 220, "valueActive": 200}
                ]
            },
            "tableData": [
                {
                    "_id": 1,
                    "address": "0x1234567890abcdef1234567890abcdef12345678",
                    "totalSessionsCompleted": 950,
                    "modelSessionsCompleted": 350,
                    "avgResponseTime": "13 ms",
                    "ipsAsk": "11.232 MOR/IPS",
                    "view": "https://example.com"
                },
                {
                    "_id": 2,
                    "address": "0x1234567890abcdef1234567890abcdef12345678",
                    "totalSessionsCompleted": 1200,
                    "modelSessionsCompleted": 450,
                    "avgResponseTime": "10 ms",
                    "ipsAsk": "10.876 MOR/IPS",
                    "view": "https://example.com"
                }
            ]
        }
    }

    if model_name in data:
        return data[model_name]
    else:
        model_name = "Llama 2.0"
        return data[model_name]


def get_provider_table_data(model_name: str):
    model_table_data = {
        "Llama 2.0": [
            {
                "_id": 1,
                "date": "12/05/2024",
                "totalSessions": 821,
                "avgResponseTime": "12 ms",
                "numberOfActiveSessions": 2,
                "morEarned": 201,
                "id": "f604"
            },
            {
                "_id": 2,
                "date": "13/05/2024",
                "totalSessions": 800,
                "avgResponseTime": "13 ms",
                "numberOfActiveSessions": 3,
                "morEarned": 220,
                "id": "96cb"
            },
            # Add more unique entries as needed
        ],
        "StableLm": [
            {
                "_id": 1,
                "date": "10/05/2024",
                "totalSessions": 700,
                "avgResponseTime": "10 ms",
                "numberOfActiveSessions": 5,
                "morEarned": 180,
                "id": "a123"
            },
            {
                "_id": 2,
                "date": "11/05/2024",
                "totalSessions": 750,
                "avgResponseTime": "11 ms",
                "numberOfActiveSessions": 4,
                "morEarned": 190,
                "id": "b456"
            }
        ],
        "Llama 3.0": [
            {
                "_id": 1,
                "date": "14/05/2024",
                "totalSessions": 900,
                "avgResponseTime": "14 ms",
                "numberOfActiveSessions": 6,
                "morEarned": 250,
                "id": "c789"
            },
            {
                "_id": 2,
                "date": "15/05/2024",
                "totalSessions": 850,
                "avgResponseTime": "12 ms",
                "numberOfActiveSessions": 5,
                "morEarned": 230,
                "id": "d012"
            }
        ]
    }

    if model_name in model_table_data:
        return model_table_data[model_name]
    else:
        model_name = "Llama 2.0"
        return model_table_data[model_name]


def get_provider_chart_data(model_name: str):
    model_chart_data = {
        "Llama 2.0": {
            "series": [
                {
                    "name": "Avg Response Time",
                    "data": [10, 20, 35, 40, 50, 60, 65],
                },
                {
                    "name": "Avg Daily IPS",
                    "data": [10, 30, 20, 45, 40, 65, 68],
                },
            ],
            "options": {
                "chart": {
                    "type": "line",
                    "toolbar": {
                        "show": False,
                    },
                },
                "stroke": {
                    "curve": "smooth",
                },
                "xaxis": {
                    "type": "datetime",
                    "categories": [
                        "2023-05-13",
                        "2023-05-14",
                        "2023-05-15",
                        "2023-05-16",
                        "2023-05-17",
                        "2023-05-18",
                        "2023-05-19",
                    ],
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "yaxis": {
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "grid": {
                    "borderColor": "#888",
                },
                "legend": {
                    "labels": {
                        "colors": "#888",
                        "useSeriesColors": True,
                    },
                },
                "tooltip": {
                    "x": {
                        "format": "dd/MM/yy",
                    },
                },
            },
        },
        "StableLm": {
            "series": [
                {
                    "name": "Avg Response Time",
                    "data": [15, 25, 30, 35, 45, 55, 60],
                },
                {
                    "name": "Avg Daily IPS",
                    "data": [12, 28, 18, 40, 38, 58, 63],
                },
            ],
            "options": {
                "chart": {
                    "type": "line",
                    "toolbar": {
                        "show": False,
                    },
                },
                "stroke": {
                    "curve": "smooth",
                },
                "xaxis": {
                    "type": "datetime",
                    "categories": [
                        "2023-06-13",
                        "2023-06-14",
                        "2023-06-15",
                        "2023-06-16",
                        "2023-06-17",
                        "2023-06-18",
                        "2023-06-19",
                    ],
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "yaxis": {
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "grid": {
                    "borderColor": "#888",
                },
                "legend": {
                    "labels": {
                        "colors": "#888",
                        "useSeriesColors": True,
                    },
                },
                "tooltip": {
                    "x": {
                        "format": "dd/MM/yy",
                    },
                },
            },
        },
        "Llama 3.0": {
            "series": [
                {
                    "name": "Avg Response Time",
                    "data": [20, 30, 40, 45, 55, 65, 70],
                },
                {
                    "name": "Avg Daily IPS",
                    "data": [15, 35, 25, 50, 45, 68, 75],
                },
            ],
            "options": {
                "chart": {
                    "type": "line",
                    "toolbar": {
                        "show": False,
                    },
                },
                "stroke": {
                    "curve": "smooth",
                },
                "xaxis": {
                    "type": "datetime",
                    "categories": [
                        "2023-07-13",
                        "2023-07-14",
                        "2023-07-15",
                        "2023-07-16",
                        "2023-07-17",
                        "2023-07-18",
                        "2023-07-19",
                    ],
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "yaxis": {
                    "labels": {
                        "style": {
                            "colors": "#888",
                        },
                    },
                },
                "grid": {
                    "borderColor": "#888",
                },
                "legend": {
                    "labels": {
                        "colors": "#888",
                        "useSeriesColors": True,
                    },
                },
                "tooltip": {
                    "x": {
                        "format": "dd/MM/yy",
                    },
                },
            },
        },
    }

    if model_name in model_chart_data:
        return model_chart_data[model_name]
    else:
        return model_chart_data["Llama 2.0"]


def get_recent_activity():
    recent_activity_data = [
        {
            "_id": 1,
            "time": "32 min",
            "color": "text-success",
            "content": "Miners - please update the node to the latest version",
            "highlight": ""
        },
        {
            "_id": 2,
            "time": "56 min",
            "color": "text-danger",
            "content": "Providers - Please Register Provider on Mor.org",
            "highlight": ""
        },
        {
            "_id": 3,
            "time": "2 hrs",
            "color": "text-primary",
            "content": "Users - Please do not click any unknown links",
            "highlight": ""
        },
        {
            "_id": 4,
            "time": "3 hrs",
            "color": "text-success",
            "content": "Miners - Please update the node to the latest version",
            "highlight": ""
        }
    ]

    return recent_activity_data
