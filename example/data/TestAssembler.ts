import { Component } from '../../src';
import { TestComponent } from './TestComponent';
import { Assembler } from '../../src/Assembler';

export class TestAssembler extends Assembler
{
    assemble(): Component[] {
        return [
            new TestComponent(500)
        ];
    }
}