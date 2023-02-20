import { newSequelize } from "./conn.js";
import { taskSupportDb } from "./conn.js";

export const tblUsers = taskSupportDb.define('tblusers', {
    userId: {
        type: newSequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fname: {
        type: newSequelize.STRING(45)
    },

    lname: {
        type: newSequelize.STRING(45)
    },

    mname: {
        type: newSequelize.STRING(45)
    },

    email: {
        type: newSequelize.STRING(45)
    },

    uname: {
        type: newSequelize.STRING(45)
    },

    pword: {
        type: newSequelize.STRING(45)
    }
},{
    tableName: 'tblusers',
    timestamps: false
});

export const tblLists = taskSupportDb.define('tblLists', {
    listId: {
        type: newSequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    listName: {
        type: newSequelize.STRING(50)
    }
}, {
    tableName: 'tblLists',
    timestamps: false
});

export const tblTasks = taskSupportDb.define('tblTasks', {
    taskId: {
        type: newSequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    taskName: {
        type: newSequelize.STRING(50),
    },

    taskDescription: {
        type: newSequelize.TEXT
    },

    requestor: {
        type: newSequelize.STRING(50)
    },

    workNumber: {
        type: newSequelize.STRING(50)
    },

    mobile: {
        type: newSequelize.STRING(50)
    },

    email: {
        type: newSequelize.STRING(50)
    },

    fk_listId: {
        type: newSequelize.INTEGER
    },

    dateCreated: {
        type: 'TIMESTAMP',
        defaultValue: newSequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },

    dateStarted: {
        type: newSequelize.STRING(50)
    },

    dateDue: {
        type: newSequelize.STRING(50)
    },

    dateCompleted: {
        type: newSequelize.STRING(50)
    }
}, {
    tableName: 'tblTasks',
    timestamps: false
})