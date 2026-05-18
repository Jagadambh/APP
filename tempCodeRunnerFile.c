#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <math.h>

#define MAX 100
char opStack[MAX];
int topOp = -1;
int valStack[MAX];
int topVal = -1;
void pushOp(char c) {
    opStack[++topOp] = c;
}
char popOp() {
    return opStack[topOp--];
}
char peekOp() {
    return opStack[topOp];
}
int isEmptyOp() {
    return topOp == -1;
}
void pushVal(int v) {
    valStack[++topVal] = v;
}
int popVal() {
    return valStack[topVal--];
}
int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}
int isRightAssociative(char op) {
    return op == '^';
}
void infixToPostfix(char infix[], char postfix[]) {
    int i, k = 0;
    for (i = 0; infix[i] != '\0'; i++) {
        char c = infix[i];

        if (isspace(c)) continue;

        if (isdigit(c)) {  
            postfix[k++] = c;
            postfix[k++] = ' ';
        }
        else if (c == '(') {
            pushOp(c);
        }
        else if (c == ')') {
            while (!isEmptyOp() && peekOp() != '(') {
                postfix[k++] = popOp();
                postfix[k++] = ' '; 
            }
            popOp(); 
        }
        else {  
            while (!isEmptyOp() && precedence(peekOp()) > 0 &&
                  ((isRightAssociative(c) == 0 && precedence(c) <= precedence(peekOp())) ||
                   (isRightAssociative(c) == 1 && precedence(c) < precedence(peekOp())))) {
                postfix[k++] = popOp();
                postfix[k++] = ' ';
            }
            pushOp(c);
        }
    }
    while (!isEmptyOp()) {
        postfix[k++] = popOp();
        postfix[k++] = ' ';
    }
    postfix[k] = '\0';
}
int evaluatePostfix(char postfix[]) {
    int i;
    for (i = 0; postfix[i] != '\0'; i++) {
        char c = postfix[i];

        if (isspace(c)) continue;

        if (isdigit(c)) {
            int num = 0;
            while (isdigit(postfix[i])) {
                num = num * 10 + (postfix[i] - '0');
                i++;
            }
            i--;
            pushVal(num);
        }
        else {
            int b = popVal();
            int a = popVal();
            switch (c) {
                case '+': pushVal(a + b); break;
                case '-': pushVal(a - b); break;
                case '*': pushVal(a * b); break;
                case '/': pushVal(a / b); break;
                case '^': pushVal((int)pow(a, b)); break;
            }
        }
    }
    return popVal();
}
int main() {
    char infix[MAX], postfix[MAX];
    printf("Enter infix expression: ");
    scanf("%[^\n]", infix);
    infixToPostfix(infix, postfix);
    int result = evaluatePostfix(postfix);
    printf("Result: %d\n", result);
    return 0;
}