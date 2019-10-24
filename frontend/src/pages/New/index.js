import React from 'react';

export default function New() {
    function handleSubmit() {
        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua Empresa Incrível"
            />
        </form>
    )
}