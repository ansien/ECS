import { Component } from './Component';

export abstract class Assembler
{
    abstract assemble(): Component[];
}