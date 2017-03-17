var near = ['Неожиданно! Рядом есть ', 'А рядом находится ', 'Что-то есть неподалеку... это - ', 'Возле него есть ', player_data.name + ' хорошо осматривается и видит что рядом с ним есть ', 'Казалось, сами боги привели ' + player_data.name + ' к этому божественному месту: '];
var loc = {
    forest: {
        name: 'Лес',
        desc: [player_data.name + ' сейчас находится в лесу.', player_data.name +  ' решил прогуляться в лесу.', 'Лес вошел в ва.., кхем, нет, таки ' + player_data.name + ' вошел в лес, да.'],
        desc_next: [player_data.name + ' продолжает идти по лесу.'],
        loc: {
            field: {
                name: 'Поляна',
                desc: ['На поляне.', '%player_name% ступил на мягкую траву - вот она, поляна!'],
                loc: {
                    trunk: {
                        enemy_chance: '0.1',
                        name: 'Пень',
                        desc: ['обычный такой трухлявый пень.']
                    },
                    tree: {
                        enemy_chance: '0.1',
                        name: 'Дерево',
                        desc: ['обыкновенное дерево.']
                    }
                }
            },
            deep: {
                name: 'Чаща',
                enemy_chance: '0.05',
                desc: ['В чаще леса.'],
                loc: {
                    trunk: {
                        enemy_chance: '0.1',
                        name: 'Пень',
                        desc: ['обычный такой трухлявый пень.']
                    },
                    tree: {
                        enemy_chance: '0.1',
                        name: 'Дерево',
                        desc: ['обыкновенное дерево.']
                    }
                }
            },
            outer: {
                name: 'Окраина',
                enemy_chance: '0.15',
                desc: ['На окраине леса.'],
                loc: {
                    trunk: {
                        enemy_chance: '0.1',
                        name: 'Пень',
                        desc: ['обычный такой трухлявый пень.']
                    },
                    tree: {
                        enemy_chance: '0.1',
                        name: 'Дерево',
                        desc: ['обыкновенное дерево.']
                    },
                    house: {
                        enemy_chance: '0.1',
                        name: 'Избушка',
                        desc: ['домик на окраине леса.']
                    }
                }
            }
        }
    },
    town: {
        name: 'Город',
        desc: [player_data.name + ' вошел в город.', '%player_name% решил что пора бы слиться с цивилизацией и таки решился войти в город.'],
        desc_next: [player_data.name + ' продолжает движение по городу.'],
        loc: {
            street: {
                name: 'Улица',
                desc: ['На какую-то безымянную улицу.', '%player_name% довольно сильно чешет затылок и думает какого черта он забыл на улице.'],
                loc: {
                    house: {
                        enemy_chance: '0.3',
                        name: 'Многоэтажка',
                        desc: ['многоэтажный панельный дом.']
                    },
                    police: {
                        enemy_chance: '0.4',
                        name: 'Полицейский участок',
                        desc: ['полицейский участок.']
                    },
                    azs: {
                        enemy_chance: '0.3',
                        name: 'АЗС',
                        desc: ['автозаправку.']
                    },
                    store: {
                        enemy_chance: '0.5',
                        name: 'Магазин',
                        desc: ['продуктовый магазин.']
                    },
                    e_store: {
                        enemy_chance: '0.2',
                        name: 'Магазин электротехники',
                        desc: ['большой магазин электротехники.']
                    },
                    supermarket: {
                        enemy_chance: '0.6',
                        name: 'Супермаркет',
                        desc: ['супермаркет.']
                    },
                    tc: {
                        enemy_chance: '0.6',
                        name: 'Торговый Центр',
                        desc: ['огромный и просторный торговый центр.']
                    },
                    hunter_store: {
                        enemy_chance: '0.6',
                        name: 'Охотничий магазин',
                        desc: ['небольшой охотничий магазин.']
                    },
                    cloth_store: {
                        enemy_chance: '0.4',
                        name: 'Магазин одежды',
                        desc: ['небольшой магазин одежды.']
                    }
                }
            }
        }
    },
    village: {
        name: 'Деревня',
        desc: [player_data.name + ' вошел в деревню.'],
        desc_next: [player_data.name + ' продолжает идти по деревне.'],
        loc: {
            street: {
                name: 'Улица',
                desc: ['На деревенскую улицу.'],
                loc: {
                    house: {
                        enemy_chance: '0.2',
                        name: 'Избушка',
                        desc: ['простенькую избушку в деревне.']
                    },
                    ogorod: {
                        enemy_chance: '0.3',
                        name: 'Огород',
                        desc: ['небольшой огород у дачи.']
                    }
                }
            }
        }
    }
};