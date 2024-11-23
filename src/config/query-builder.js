class QueryBuilder {
    constructor() {
        this.query = "";
        this.isInsert = false;
        this.isSelect = false;
    }

    select() {
        this.isSelect = true;
        this.query += "SELECT ";
        return this;
    }

    insert() {
        this.isInsert = true;
        this.query += "INSERT INTO ";
        return this;
    }

    tableName(tableName) {
        if (this.isSelect) {
            this.query += "FROM " + tableName + " ";
            return this;
        } else {
            this.query += " " + tableName;
        }
        return this;
    }

    columns(params) {
        let base = "";

        if (this.isSelect) {
            const paramSize = params.length;
            params.forEach((param, index) => {
                base += index === paramSize - 1 ? param + " " : param + ", ";
            });
            this.query += base;
            return this;
        } else {
            base += "(";
            const paramSize = params.length;
            params.forEach((param, index) => {
                if (index === paramSize - 1) {
                    base += param + ") ";
                } else {
                    base += param + ", ";
                }
            });
            base += "VALUES(";
            params.forEach((param, index) => {
                if (index === paramSize - 1) {
                    base += "?" + ")";
                } else {
                    base += "?" + ", ";
                }
            });
            this.query += base;
            return this;
        }
    }

    /**
     * @param {string[]} params
     * @param {string|null} operator
    */
    where(params, operator = null) {
        let base = "WHERE ";

        const paramSize = params.length;
        if (paramSize > 1 && operator == null) {
            return this;
        }

        params.forEach((param, index) => {
            if (index === paramSize - 1) {
                base += param + " = ?";
            } else {
                base += param + " = ?" + " " + operator + " ";
            }
        });

        this.query += base;
        return this;
    }

    getQuery() {
        const chainedQuery = this.query;
        this.isSelect = false;
        this.isInsert = false;
        this.query = "";
        return chainedQuery;
    }
}

module.exports = QueryBuilder;