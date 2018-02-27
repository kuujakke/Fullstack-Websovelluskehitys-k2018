import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
    }

    it('should return a proper initial state when called with undefined state',
        () => {
            const state = {}
            const action = {
                type: 'DO_NOTHING',
            }

            const newState = counterReducer(undefined, action)
            expect(newState).toEqual(initialState)
        })

    it('good is incremented', () => {
        const action = {
            type: 'GOOD',
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0,
        })
    })

    it('ok is incremented', () => {
        const action = {
            type: 'OK',
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0,
        })
    })

    it('bad is incremented', () => {
        const action = {
            type: 'BAD',
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1,
        })
    })

    it('zero returns state with zeroed values', () => {
        const action = {
            type: 'ZERO',
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0,
        })
    })

    it('zero after several increments zeroes values', () => {
        let state = initialState
        state = counterReducer(state, {type: 'GOOD'})
        state = counterReducer(state, {type: 'BAD'})
        state = counterReducer(state, {type: 'OK'})
        expect(state).toEqual({
            good: 1,
            ok: 1,
            bad: 1,
        })
        deepFreeze(state)
        const newState = counterReducer(state, {type: 'ZERO'})
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 0,
        })
    })
})